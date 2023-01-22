package com.example.backend.payload;

import lombok.Data;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Data
public class ProductDto {

    private Long id;

    @NotEmpty
    @Size(min = 1, max = 50, message = "Product name should be at least 1 character")
    private String productName;

    @Length(max = 2000)
    @Size(max = 2000, message = "Product description should be maximum of 2000 characters")
    private String description;

    @Range(min = 0, message = "Price could not be a negative number")
    private double buyPrice;

    @Range(min = 0, message = "Price could not be a negative number")
    private double sellPrice;

    @Range(min = 0, message = "Quantity could not be a negative number")
    private int quantity;

    @NotEmpty
    private String category;

    @NotEmpty
    private String productCode;

    private String image;
}
