package com.carminezacc.algoritmo.repositories

import com.carminezacc.algoritmo.models.GenericString
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.query.Param
import org.springframework.transaction.annotation.Transactional
import java.util.ArrayList


interface GenericStringRepository : CrudRepository<GenericString, Long> {
    fun findByName(name: String): List<GenericString>
    @Transactional
    @Modifying
    @Query(value = "update GenericString set value=:v where name=:n")
    fun cambiaStringaIn(@Param("n")n: String, @Param("v")v: String): Unit
}
