package services

import java.awt.{FontMetrics, AlphaComposite, Image}
import java.awt.image.BufferedImage

object ImageUtils {
  def resizeImage(image: Image, width: Int, height: Int): BufferedImage = {
    val bufferedImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB)
    val graphics2D = bufferedImage.createGraphics()
    graphics2D.setComposite(AlphaComposite.Src)
    graphics2D.drawImage(image, 0, 0, width, height, null)
    graphics2D.dispose()

    bufferedImage
  }
}
