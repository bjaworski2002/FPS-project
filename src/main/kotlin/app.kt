import spark.Request
import spark.Response
import spark.Spark.*

fun main() {
    staticFiles.location("/dist")
    port(5000)
    get("/") { req, res -> res.redirect("index.html") } // get pliku index.html
    get("/game") { req, res -> startgame(req, res) } // get pliku game.html
    get("/editor") { req, res -> "editor" } // get pliku editor.html
    // post("/add") {  } // dodanie danych levelu
    // post("/load") {  } // pobranie danych levelu

}

fun startgame(req: Request?, res: Response) {
    res.type("text/html")
    res.redirect("game.html")
}
