package com.example.ecommerce.model;

import jakarta.persistence.*;
import org.hibernate.validator.constraints.UUID;

import java.math.BigInteger;
import java.text.Normalizer;
import java.util.Date;

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

    @Column
    private Normalizer.Form sex;

    @Column (unique = true, nullable = false)
    private BigInteger contactNumber;
}
