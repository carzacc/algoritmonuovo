package com.carminezacc.algoritmo.models

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id

@Entity
class Sessione (
        var token: String = "",
        var userid: Long = 0,
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long = 0
)