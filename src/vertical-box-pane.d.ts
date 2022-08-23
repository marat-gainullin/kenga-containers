import Utils from 'kenga/utils'
import Container from 'kenga/container'

export default class VBox extends Container {
  hgap: number | string
  vgap: number | string
  align: `${Utils.HorizontalAlign}`
}
