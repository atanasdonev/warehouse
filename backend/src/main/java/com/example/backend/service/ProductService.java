package com.example.backend.service;

import com.example.backend.payload.ProductDto;
import com.example.backend.payload.ProductResponse;

public interface ProductService {
    ProductDto createProduct(ProductDto productDto);

    ProductResponse getAllProducts(int pageNo, int pageSize, String sortBy, String sortDir);

    ProductDto getProductById(long id);

    ProductDto updateProduct(ProductDto productDto, long id);

    void deleteProductById(long id);

    ProductResponse getProductsByNameAndCategory(String name, String category, int pageNo, int pageSize);

    ProductResponse getProductByProductCode(String productCode, int pageNo, int pageSize);
}
