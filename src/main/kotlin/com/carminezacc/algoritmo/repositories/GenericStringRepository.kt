package com.carminezacc.algoritmo.repositories

import com.carminezacc.algoritmo.models.GenericString
import org.springframework.data.repository.CrudRepository

interface GenericStringRepository : CrudRepository<GenericString, Long> {
    fun findByName(name: String): List<GenericString>
}
