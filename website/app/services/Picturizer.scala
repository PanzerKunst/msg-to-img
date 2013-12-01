package services

import java.awt.image.BufferedImage
import java.awt._
import javax.imageio.ImageIO
import java.io.ByteArrayOutputStream
import play.api.Logger
import scala.List

class Picturizer {
  val leftPadding = 10
  val topPadding = 10
  val bottomPadding = topPadding

  var imgWidth: Int = _
  var fontSize: Int = _
  var font: Font = _
  var fontMetrics: FontMetrics = _

  def this(imgWidth: Int, fontSize: Int) = {
    this()

    this.imgWidth = imgWidth
    this.fontSize = fontSize
    this.font = new Font("Arial", Font.PLAIN, fontSize)
    this.fontMetrics = new BufferedImage(1, 1, BufferedImage.TYPE_INT_RGB).getGraphics.getFontMetrics(font)
  }

  def picturize(text: String): Array[Byte] = {
    val shortLines = convertToShortLines(text)
    val imgHeight = (fontSize + topPadding) * shortLines.length + bottomPadding
    val (image, graphics) = initImage(imgHeight)
    drawLines(shortLines, graphics)

    toBytes(image)
  }

  private def toBytes(image: BufferedImage): Array[Byte] = {
    val outputStream = new ByteArrayOutputStream()
    ImageIO.write(image, "png", outputStream)
    outputStream.flush()
    val bytes = outputStream.toByteArray
    outputStream.close()

    bytes
  }

  private def initImage(imgHeight: Int): (BufferedImage, Graphics2D) = {
    val image = new BufferedImage(imgWidth, imgHeight, BufferedImage.TYPE_INT_RGB)
    val graphics = image.getGraphics.asInstanceOf[Graphics2D]

    // Set background colour
    graphics.setColor(Color.WHITE)
    graphics.fillRect(0, 0, image.getWidth, image.getHeight)

    // Set font colour
    graphics.setColor(Color.BLACK)
    graphics.setFont(font)

    graphics.setRenderingHint(RenderingHints.KEY_TEXT_ANTIALIASING, RenderingHints.VALUE_TEXT_ANTIALIAS_LCD_HRGB)

    (image, graphics)
  }

  private def drawLines(shortLines: List[Array[String]], graphics: Graphics2D) {
    var topSpace = fontSize + topPadding

    for (i <- 1 to shortLines.length) {
      val shortLine = shortLines.apply(i - 1)
      graphics.drawString(shortLine.mkString(" "), leftPadding, topSpace)
      topSpace = topSpace + fontSize + topPadding
    }
  }

  private def convertToShortLines(rawMessageText: String): List[Array[String]] = {
    var shortLines: List[Array[String]] = List()

    for (line <- rawMessageText.split("\r\n")) {
      var linesOfWords = List(line.split(" "))

      while (isLineTooLong(linesOfWords.last.mkString(" "))) {
        linesOfWords = breakUp(linesOfWords)
      }

      for (shortLine <- linesOfWords) {
        shortLines = shortLines :+ shortLine
      }
    }

    shortLines
  }

  private def isLineTooLong(line: String): Boolean = {
    fontMetrics.stringWidth(line) > imgWidth - leftPadding
  }

  private def breakUp(linesOfWords: List[Array[String]]): List[Array[String]] = {
    var shorterLine = ""

    var lastLine = linesOfWords.last

    while (!isLineTooLong(shorterLine) && lastLine.length > 0) {
      shorterLine += lastLine.head + " "
      lastLine = lastLine.drop(1)
    }

    // The line is now 1 word too long -> backtracking the last add
    val wordsOfTheShorterLine = shorterLine.split(" ")

    val backtrackedShorterLine = for (i <- 0 to wordsOfTheShorterLine.length - 2) yield wordsOfTheShorterLine.apply(i)

    lastLine = wordsOfTheShorterLine.last +: lastLine

    var result = for (i <- 0 to linesOfWords.length - 2) yield linesOfWords.apply(i)

    // Replacing the old last long line by the new shorter one, and adding the new last line
    result = result :+ backtrackedShorterLine.toArray :+ lastLine

    result.toList
  }
}
