import { Component, Output, EventEmitter } from '@angular/core'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzMessageService } from 'ng-zorro-antd/message'
import { NzUploadChangeParam, NzUploadModule } from 'ng-zorro-antd/upload'

@Component({
  selector: 'app-json-upload',
  standalone: true,
  imports: [NzButtonModule, NzIconModule, NzUploadModule],
  templateUrl: './json-upload.component.html',
  styleUrls: ['./json-upload.component.scss']
})
export class JsonUploadComponent {
  @Output() fileLoaded = new EventEmitter<string>()

  constructor(private messageService: NzMessageService) {}

  // Evita la subida automática
  beforeUpload = (): boolean => {
    return false
  }

  handleChange(info: NzUploadChangeParam): void {
    console.log('Evento de carga:', info)
    // Verifica si el archivo fue removido (por si acaso)
    if (info.file.status === 'removed') return

    const file = info.file.originFileObj
    if (!file) {
      console.error('No se encontró archivo en el evento.')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      const content = reader.result as string
      console.log('Contenido del archivo:', content)
      this.fileLoaded.emit(content)
      this.messageService.success(`${file.name} cargado correctamente`)
    }
    reader.onerror = () => {
      this.messageService.error(`${file.name} fallo al cargar.`)
    }
    reader.readAsText(file)
  }

  
}