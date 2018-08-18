package com.carminezacc.algoritmo.models

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.GenerationType

@Entity
class Post (
        var dataeora: Long = System.currentTimeMillis() / 1000,
        var titolo: String = "",
        var lead: String = "",
        var testo: String = "",
        var idutente: Long = 0,
        var headerURL: String = "",
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long = 0
)