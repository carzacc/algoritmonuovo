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


@SpringBootApplication
class CmsApplication

class PostRicevuto (
        var token: String,
        var lead: String,
        var titolo: String,
        var idutente: Long,
        var testo: String,
        var headerURL: String
)

class GiornataRicevuta (
        var token: String,
        var idutente: Long,
        var giornata: Long
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

    @GetMapping("/api/utente/{id}")
    fun trovaUtente(@PathVariable id: Long) =
            repository.findById(id)
    @GetMapping("/api/utente/nome/{nome}")
    fun trovaUtente(@PathVariable nome: String) =
            repository.findByNickName(nome)
}

class GenericStringController(val repository: GenericStringRepository, val repoSessione: SessioneRepository) {
    @PostMapping("/api/giornata")
    fun aggiungiGiornata(@RequestBody post: GiornataRicevuta): Any {
        if(repoSessione.findByToken(post.token).userid == post.idutente) {
            repository.findByName("giornata")[0].value =
                    if (repository.findByName("giornata")[0].value.toLong() < post.giornata)
                        (post.giornata.toString())
                    else
                        (repository.findByName("giornata")[0].value)
            return "true"
        }
        return "false"
    }

    @GetMapping("/api/giornata")
    fun giornata() =
            repository.findByName("giornata")[0].value.toLong()

}

@RestController
class PostController (val repository: PostRepository, val repoSessione: SessioneRepository, val repoUtenti: UtenteRepository, val string: GenericStringRepository, var partite: PartitaRepository) {

    @PostMapping("/api/pubblica")
    fun pubblicaPost(@RequestBody post: PostRicevuto): Any {
        if(repoSessione.findByToken(post.token).userid == post.idutente) {
            return repository.save(Post(
                    System.currentTimeMillis() / 1000,
                    post.lead,
                    post.titolo,
                    post.testo,
                    post.idutente,
                    post.headerURL
            ))
        }
        return "false"
    }


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

    @GetMapping("/api/id/{id}")
    fun findPostById(@PathVariable id: Long) =
            repository.findById(id)

    @GetMapping("/")
    fun homePage(model: ModelAndView): ModelAndView {
        model.viewName = "index"
        return model
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
        users.save(Utente(
                "Carmine",
                "Zaccagnino",
                "carminezacc",
                "pizza"
        ))
        string.save(GenericString(
                "giornata",
                "0"
        ))
    }
}


fun main(args: Array<String>) {
    runApplication<CmsApplication>(*args)
}
