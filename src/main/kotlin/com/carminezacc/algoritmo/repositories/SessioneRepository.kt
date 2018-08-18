package com.carminezacc.algoritmo.repositories

import com.carminezacc.algoritmo.models.Sessione
import org.springframework.data.repository.CrudRepository

interface SessioneRepository : CrudRepository<Sessione, Long> {
    fun findByToken(token: String): Sessione

}