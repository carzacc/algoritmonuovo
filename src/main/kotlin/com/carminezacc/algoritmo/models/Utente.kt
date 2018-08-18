package com.carminezacc.algoritmo.models

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id

@Entity
class Utente (
        var firstName: String = "",
        var lastName: String = "",
        var nickName: String = "",
        var password: String = " ",
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long = 0
)