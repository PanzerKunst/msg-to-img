package controllers

import play.api.mvc._
import services.Picturizer

object Application extends Controller {

  def index = Action {
    Ok(views.html.index())
  }

  def softwareDeveloper = Action {
    Ok(views.html.index())
  }

  // Accept only 20KB of data.
  def picturize = Action(parse.urlFormEncoded(20 * 1024)) { request =>
    request.body.get("text") match {
      case Some(stringSeq) =>
        stringSeq.headOption match {
          case Some(text) => Ok(new Picturizer(500, 16).picturize(text)).as("image/png")
          case None => BadRequest("Form field 'text' present, but reading it ended in error")
        }
      case None => BadRequest("Missing form field 'text'")
    }
  }
}