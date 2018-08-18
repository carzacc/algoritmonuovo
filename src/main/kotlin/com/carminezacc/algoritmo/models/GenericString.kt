package com.carminezacc.algoritmo.models

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id

@Entity
class GenericString (
    var name: String = "",
    var value: String = "",
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0
)