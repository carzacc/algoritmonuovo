package com.carminezacc.algoritmo

import com.carminezacc.algoritmo.models.*
import com.carminezacc.algoritmo.repositories.*
import groovy.lang.GroovySystem
import org.apache.commons.logging.Log
import org.springframework.boot.Banner
import org.springframework.boot.CommandLineRunner
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.context.annotation.Configuration
import org.springframework.web.bind.annotation.*
import org.springframework.web.servlet.ModelAndView
import org.springframework.stereotype.Controller
import java.time.LocalDateTime
import org.springframework.web.servlet.view.groovy.GroovyMarkupViewResolver
import org.springframework.web.servlet.view.groovy.GroovyMarkupConfigurer
import org.springframework.web.servlet.config.annotation.EnableWebMvc

class GiornataRicevuta (
        var token: String,
        var idutente: Long,
        var giornata: Long
)

class CancellazioneRicevuta (
        var token: String,
        var idutente: Long,
        var id: Long
)

class PartitaRicevuta (
        var token: String,
        var idutente: Long,
        var giornata: Long,
        var team1: String,
        var team2: String,
        var goal1: Long,
        var goal2: Long
)


class StringaAutorizzata(
        var token: String,
        var stringa: String
)

class UsernameAndPassword(
        var username: String,
        var password: String
)

@RestController
class UtenteController (val repository: UtenteRepository, val repoSessione: SessioneRepository) {

    @GetMapping("/api/id/nome/{nome}")
    fun trovaGiornata(@PathVariable nome: String) =
            repository.findByNickName(nome).id


    @PostMapping("/api/login")
    fun accedi(@RequestBody post: UsernameAndPassword): String {
        val nickName = post.username
        val segreto = post.password
        val utenti = repository.findByNickNameAndPassword(nickName, segreto)
        if(! utenti.isEmpty()){
            var token = ""
            val caratteri = "-.,+#<>={}|^@$&*/!0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
            for(i in 1..64) {
                token+=caratteri[Math.floor(Math.random() * caratteri.length).toInt()]
            }
            val sessione = Sessione(token, utenti[0].id)
            repoSessione.save(sessione)
            return token
        }
        return "false"
    }
}

@RestController
class GenericStringController(val repository: GenericStringRepository, val repoSessione: SessioneRepository) {
    @PostMapping("/api/giornata")
    fun aggiungiGiornata(@RequestBody post: GiornataRicevuta): Any {
        print("Giornata Ricevuta:"+post.giornata.toString()+"\n")
        if(repoSessione.findByToken(post.token).userid == post.idutente) {
            if (repository.findByName("giornata")[0].value.toLong() < post.giornata)
                repository.cambiaStringaIn("giornata", post.giornata.toString())

            print("Dopo aggiunta giornata:"+repository.findByName("giornata")[0].value+"\n")
            return "true"
        }
        return "false"
    }

    @GetMapping("/api/trovagiornata")
    fun trovaGiornata(): String {
        print(repository.findByName("giornata")[0].value.toLong())
        return "{ \"g\": "+repository.findByName("giornata")[0].value+" }"
    }

}

class PartitaDaInviare(
        var giornata: Long,
        var partita: String,
        var risultato: String
)

@RestController
class PostController (val repoSessione: SessioneRepository, val repoUtenti: UtenteRepository, val string: GenericStringRepository, var partite: PartitaRepository) {


    @PostMapping("/api/partita")
    fun aggiungiPartita(@RequestBody partita: PartitaRicevuta): Any {
        if(repoSessione.findByToken(partita.token).userid == partita.idutente) {
            if(repoSessione.findByToken(partita.token).userid == partita.idutente) {
                return partite.save(Partita(
                        partita.giornata,
                        partita.team1,
                        partita.team2,
                        partita.goal1,
                        partita.goal2
                ))
            }
            return "false"        }
        return "false"
    }

    @GetMapping("/api/partite")
    fun findAllPosts() =
            partite.findAll()


    @GetMapping("/")
    fun homePage(model: ModelAndView): ModelAndView {
        model.viewName = "index"
        return model
    }
    @GetMapping("/squadra/{nomesquadra}")
    fun squadra(model: ModelAndView, @PathVariable nomesquadra: String): ModelAndView {
        model.viewName = "squadra"
        var partiteDb = partite.findByTeam1(nomesquadra).union(partite.findByTeam2(nomesquadra))
        var partite = mutableListOf<PartitaDaInviare>()
        var i = 0
        for(partitaDb in partiteDb) {
            partite.add(i, PartitaDaInviare(
                    partitaDb.giornata,
                    "${partitaDb.team1}-${partitaDb.team2}",
                    "${partitaDb.goal1}-${partitaDb.goal2}"
            ))
            i++
        }
        model.model.put("partite", partite)
        return model
    }

    @PostMapping("/api/cancella")
    fun cancellaPartita(@RequestBody cancellazion: CancellazioneRicevuta): Any {
        if (repoSessione.findByToken(cancellazion.token).userid == cancellazion.idutente) {
            partite.deleteById(cancellazion.id)
            return "true"
        }
        return "false"
    }
}

@SpringBootApplication
class Application {
    /*
        @Bean
        fun passwordEncoder(): PasswordEncoder {
            return BCryptPasswordEncoder()
        }
    */
    @Bean
    fun init(posts: PostRepository, users: UtenteRepository, string: GenericStringRepository) = CommandLineRunner {
    }
}


fun main(args: Array<String>) {
    runApplication<Application>(*args)
}
