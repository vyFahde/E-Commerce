package com.example.notification.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitAdmin;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class RabbitMQConfig {

    public static final String QUEUE_WELCOME_EMAIL = "customer.v1.welcome-email";
    public static final String EXCHANGE_NAME = "ecommerce.direct";
    public static final String DLX_NAME = "ecommerce.dlx";
    public static final String ROUTING_KEY_WELCOME = "customer.welcome";

    @Bean
    public DirectExchange ecommerceExchange() {
        return new DirectExchange(EXCHANGE_NAME);
    }

    @Bean
    public DirectExchange deadLetterExchange() {
        return new DirectExchange(DLX_NAME);
    }

    @Bean
    public RabbitAdmin rabbitAdmin(ConnectionFactory connectionFactory) {
        return new RabbitAdmin(connectionFactory);
    }

    @Bean
    public Queue welcomeEmailQueue(RabbitAdmin rabbitAdmin) {
        // Garante que a fila seja recriada com os argumentos de DLX corretos
        rabbitAdmin.deleteQueue(QUEUE_WELCOME_EMAIL);
        
        Map<String, Object> args = new HashMap<>();
        // Configuração de Dead Letter Exchange deve ser idêntica em todos os serviços que declaram a fila
        args.put("x-dead-letter-exchange", DLX_NAME);
        args.put("x-dead-letter-routing-key", ROUTING_KEY_WELCOME);
        return QueueBuilder.durable(QUEUE_WELCOME_EMAIL).withArguments(args).build();
    }

    @Bean
    public Binding welcomeEmailBinding(Queue welcomeEmailQueue, DirectExchange ecommerceExchange) {
        return BindingBuilder.bind(welcomeEmailQueue).to(ecommerceExchange).with(ROUTING_KEY_WELCOME);
    }

    @Bean
    public Jackson2JsonMessageConverter messageConverter() {
        return new Jackson2JsonMessageConverter();
    }
}
