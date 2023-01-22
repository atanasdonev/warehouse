package com.example.backend.service.impl;

import com.example.backend.entity.Product;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.payload.ProductDto;
import com.example.backend.payload.ProductResponse;
import com.example.backend.repository.ProductRepository;
import com.example.backend.service.ProductService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ModelMapper mapper;

    @Override
    public ProductDto createProduct(ProductDto productDto) {
//        convert DTO to entity
        Product product = mapToEntity(productDto);

        Product newProduct = productRepository.save(product);


//        convert entity to DTO
        ProductDto productResponse = mapToDto(newProduct);
        return productResponse;
    }

    @Override
    public ProductResponse getAllProducts(int pageNo, int pageSize, String sortBy, String sortDir) {

//        creating a sort object depending on the sort direction - ascending or descending
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() :
                Sort.by(sortBy).descending();

//        creating a pageable instance and sort by
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);

//        getting a page with all the products
        Page<Product> products = productRepository.findAll(pageable);

//        get content from page object
        List<Product> listOfProducts = products.getContent();

//        filling the content list with all the productDTOs
        List<ProductDto> content = listOfProducts.stream().map(product -> mapToDto(product)).collect(Collectors.toList());

//        creating a response object and settings its fields
        ProductResponse productResponse = new ProductResponse();
        productResponse.setContent(content);
        productResponse.setPageNo(products.getNumber());
        productResponse.setPageSize(products.getSize());
        productResponse.setTotalElements(products.getTotalElements());
        productResponse.setTotalPages(products.getTotalPages());
        productResponse.setLast(products.isLast());

        return productResponse;
    }

    @Override
    public ProductDto getProductById(long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));
        return mapToDto(product);
    }

    @Override
    public ProductDto updateProduct(ProductDto productDto, long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));

        product.setId(product.getId());
        product.setProductName(productDto.getProductName());
        product.setProductCode(productDto.getProductCode());
        product.setBuyPrice(productDto.getBuyPrice());
        product.setSellPrice(productDto.getSellPrice());
        product.setDescription(productDto.getDescription());
        product.setQuantity(productDto.getQuantity());
        product.setCategory(productDto.getCategory());
        product.setImage(productDto.getImage());

        Product updatedProduct = productRepository.save(product);
        return mapToDto(updatedProduct);
    }

    @Override
    public void deleteProductById(long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));
        productRepository.delete(product);
    }

    @Override
    public ProductResponse getProductsByNameAndCategory(String name, String category, int pageNo, int pageSize) {
//        creating a pageable instance
        Pageable pageable = PageRequest.of(pageNo, pageSize);

//        getting a page with all the products
        Page<Product> products = productRepository.getAllByNameAndCategory(name, category, pageable);

        List<ProductDto> content = products.stream().map(product -> mapToDto(product)).collect(Collectors.toList());

        ProductResponse productResponse = new ProductResponse();
        productResponse.setContent(content);
        productResponse.setPageNo(products.getNumber());
        productResponse.setPageSize(products.getSize());
        productResponse.setTotalElements(products.getTotalElements());
        productResponse.setTotalPages(products.getTotalPages());
        productResponse.setLast(products.isLast());

        return productResponse;
    }

    @Override
    public ProductResponse getProductByProductCode(String productCode, int pageNo, int pageSize){
        Pageable pageable = PageRequest.of(pageNo, pageSize);

        Page<Product> products = productRepository.getProductByProductCode(productCode, pageable);

        List<ProductDto> content = products.stream().map(product -> mapToDto(product)).collect(Collectors.toList());

        ProductResponse productResponse = new ProductResponse();
        productResponse.setContent(content);
        productResponse.setPageNo(products.getNumber());
        productResponse.setPageSize(products.getSize());
        productResponse.setTotalElements(products.getTotalElements());
        productResponse.setTotalPages(products.getTotalPages());
        productResponse.setLast(products.isLast());

        return productResponse;
    }

    //    convert entity to DTO
    private ProductDto mapToDto(Product product){
        ProductDto productDto = mapper.map(product, ProductDto.class);
        return productDto;
    }

    //  convert DTO to entity
    private Product mapToEntity(ProductDto productDto){
        Product product = mapper.map(productDto, Product.class);
        return product;
    }
}

