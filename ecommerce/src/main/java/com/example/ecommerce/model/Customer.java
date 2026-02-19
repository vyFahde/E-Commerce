package com.example.ecommerce.model;

import jakarta.persistence.*;
import org.hibernate.validator.constraints.UUID;

import java.math.BigInteger;
import java.text.Normalizer;
import java.util.Date;

/*
Entity -> Com essa Class nós conseguimos criar as Entidades(Tablas do banco)
@Id -> Id da tabela
@GeneratedValue -> Auto increment do banco
UUID  -> Criptografia do dado.
*/


@Entity
public class Customer {
    //Dados de login
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(unique = true, nullable = false)
    private UUID id;

    @Column (unique = true, nullable = false)
    private String email;

    @Column (nullable = false)
    private String password;

    // Dados pessoais
    @Column (nullable = false)
    private String name;

    @Column (nullable = false, length = 8)
    private String cep;

    @Column (unique = true, nullable = false)
    private BigInteger cpf;

    @Column (nullable = false)
    private Date birth;

    @Column
    private Normalizer.Form gender;
    //Nesta sessão vamos criar o formulario.

    @Column
    private Normalizer.Form sex;
    //Dados de Contato
    @Column (unique = true, nullable = false)
    private BigInteger contactNumber;


    public Customer(){

    }

    public Customer(UUID id,
                    String email,
                    String password,
                    String cep,
                    BigInteger cpf,
                    Date birth){

                    this.id = id;
                    this.email = email;
                    this.password = password;
                    this.cep = cep;
                    this.cpf = cpf;
                    this.birth = birth;

    }
    // 3️⃣ Cadastro sem dados opcionais (sexo/gênero)
    public Customer(String email,
                    String password,
                    String name,
                    String cep,
                    BigInteger cpf,
                    Date birth,
                    BigInteger contactNumber) {

        this.email = email;
        this.password = password;
        this.name = name;
        this.cep = cep;
        this.cpf = cpf;
        this.birth = birth;
        this.contactNumber = contactNumber;
    }

    // 4️⃣ Uso interno / testes (com ID)
    public Customer(UUID id,
                    String email,
                    String password,
                    String name,
                    String cep,
                    BigInteger cpf,
                    Date birth,
                    BigInteger contactNumber) {

        this(email, password, name, cep, cpf, birth, contactNumber);
        this.id = id;
    }
}

