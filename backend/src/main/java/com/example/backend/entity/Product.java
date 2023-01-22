package com.example.backend.entity;

import lombok.Data;
import org.hibernate.validator.constraints.Range;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@Table(name = "products", uniqueConstraints = { @UniqueConstraint(columnNames = { "product_code" }) })
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "product_name", length = 50)
    @NotNull
    @Size(min = 1, max = 50, message = "Product name should be at least 1 character")
    private String productName;

    @Column(name = "description", length = 2000)
    @Size(max = 2000, message = "Product description should be maximum of 2000 characters")
    private String description;

    @Column(name = "buy_price", nullable = false)
    @NotNull
    @Range(min = 0, message = "Price could not be a negative number")
    private double buyPrice;

    @Column(name = "sell_price", nullable = false)
    @NotNull
    @Range(min = 0, message = "Price could not be a negative number")
    private double sellPrice;

    @Column(name = "quantity", nullable = false)
    @NotNull
    @Range(min = 0, message = "Quantity could not be a negative number")
    private int quantity;

    @Column(name = "category", nullable = false)
    @NotNull
    private String category;

    @Column(name = "product_code", nullable = false)
    @NotNull
    private String productCode;

    @Lob
    @Column(name = "image", columnDefinition = "LONGBLOB")
    private String image;
}
