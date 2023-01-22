package com.example.backend.repository;

import com.example.backend.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query(value = "select * from products p where p.product_name like %:name% and p.category like %:category%", nativeQuery = true)
    Page<Product> getAllByNameAndCategory(@Param("name") String name, @Param("category") String category, Pageable pageable);

    Page<Product> getProductByProductCode(String productCode, Pageable pageable);
}

