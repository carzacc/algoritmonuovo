package com.carminezacc.algoritmo.repositories

import com.carminezacc.algoritmo.models.Utente
import org.springframework.data.repository.CrudRepository

interface UtenteRepository : CrudRepository<Utente, Long> {
    fun findByNickNameAndPassword(nickName: String, password: String): List<Utente>
    fun findByNickName(nickname: String): Utente
}
