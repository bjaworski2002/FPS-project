import com.google.gson.Gson
import spark.Request
import spark.Response
import spark.Spark.*
import spark.kotlin.*
import java.util.HashMap



var levelData: Level = Level(10, mutableListOf())
fun main() {
    spark.kotlin.port(5000)
    spark.kotlin.staticFiles.location("/dist")
    before() {
        response.header("Access-Control-Allow-Origin", "http://localhost:8080")
        response.header("Access-Control-Request-Method", "GET,POST,OPTIONS")
        response.header("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version")
    }
    get("/") { req, res -> res.redirect("index.html") } // get pliku index.html
    get("/game") { req, res -> startgame(req, res) } // get pliku game.html
    get("/editor") { req, res -> res.redirect("editor.html") } // get pliku editor.html
    post("/add") { req, res -> addData(req, res) } // dodanie danych levelu
    get("/load") {req, res -> sendData(req, res)  } // pobranie danych levelu

}

fun sendData(req: Request, res: Response): String {

    res.type("application/json")
    println(Gson().toJson(levelData.levelItems))
    return Gson().toJson(levelData.levelItems)
    /*return """
[{"id":1,"x":0,"y":0,"z":0,"type":"wall"},{"id":21,"x":0,"y":0,"z":2,"type":"wall"},{"id":41,"x":0,"y":0,"z":4,"type":"wall"},{"id":61,"x":0,"y":0,"z":6,"type":"wall"},{"id":81,"x":0,"y":0,"z":8,"type":"wall"},{"id":92,"x":1,"y":0,"z":9,"type":"wall"},{"id":72,"x":1,"y":0,"z":7,"type":"wall"},{"id":52,"x":1,"y":0,"z":5,"type":"wall"},{"id":32,"x":1,"y":0,"z":3,"type":"wall"},{"id":12,"x":1,"y":0,"z":1,"type":"wall"}]    """.trimIndent()
*/}

fun addData(req: Request?, res: Response): Request? {
    if (req != null) {
        //println(message = req.body())
        var test : Array<LevelItem> = Gson().fromJson(req.body(), Array<LevelItem>::class.java) ?: arrayOf()
        levelData = Level(10, mutableListOf(*test))
        println(Gson().toJson(levelData))
    }
    res.type("text/html")
    return(req)
}

fun startgame(req: Request?, res: Response) {
    res.type("text/html")
    res.redirect("/game/")
}
