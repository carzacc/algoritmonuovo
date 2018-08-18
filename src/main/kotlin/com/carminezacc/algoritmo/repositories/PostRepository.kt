package com.carminezacc.algoritmo.repositories

import com.carminezacc.algoritmo.models.Post
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository

interface PostRepository : CrudRepository<Post, Long> {
}