package com.example.backend.payload;

import lombok.Data;

import java.util.List;

@Data
public class ProductResponse {
    private List<ProductDto> content;
    private int pageNo;
    private int pageSize;
    private long totalElements;
    private int totalPages;
    private boolean last;
}