package com.carminezacc.algoritmo.models

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.GenerationType

@Entity
class Partita(
        var giornata: Long = 0,
        var team1: String = "",
        var team2: String =  "",
        var goal1: Long = 0,
        var goal2: Long = 0,
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long = 0
)