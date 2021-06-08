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
    return if (levelData.levelItems.size > 0) Gson().toJson(levelData.levelItems)
    else """[{"id":12,"x":1,"y":0,"z":1,"type":"wall"},{"id":22,"x":1,"y":0,"z":2,"type":"wall"},{"id":23,"x":2,"y":0,"z":2,"type":"wall"},{"id":13,"x":2,"y":0,"z":1,"type":"wall"},{"id":17,"x":6,"y":0,"z":1,"type":"enemy"},{"id":27,"x":6,"y":0,"z":2,"type":"enemy"},{"id":28,"x":7,"y":0,"z":2,"type":"enemy"},{"id":18,"x":7,"y":0,"z":1,"type":"enemy"},{"id":77,"x":6,"y":0,"z":7,"type":"treasure"},{"id":87,"x":6,"y":0,"z":8,"type":"treasure"},{"id":88,"x":7,"y":0,"z":8,"type":"treasure"},{"id":72,"x":1,"y":0,"z":7,"type":"light"},{"id":83,"x":2,"y":0,"z":8,"type":"light"},{"id":82,"x":1,"y":0,"z":8,"type":"light"},{"id":78,"x":7,"y":0,"z":7,"type":"treasure"},{"id":73,"x":2,"y":0,"z":7,"type":"light"}]""".trimIndent()
}

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
