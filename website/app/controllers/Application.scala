package controllers

import play.api.mvc._
import services.Picturizer

object Application extends Controller {

  def index = Action {
    implicit request =>
      Ok(views.html.index())
  }

  def about = Action {
    Ok(views.html.about())
  }

  // Accept only 30KB of data.
  def picturize = Action(parse.urlFormEncoded(30 * 1024)) {
    implicit request =>
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