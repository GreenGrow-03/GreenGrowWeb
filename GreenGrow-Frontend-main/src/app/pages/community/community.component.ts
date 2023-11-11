import { Component, ViewChild, ElementRef, AfterViewChecked  } from '@angular/core';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

  messages: any[]=[]; // Suponiendo que cada mensaje tiene una estructura { author: string, content: string }
  newMessage: string = '';
  isLoggedIn: boolean = false; // Aquí deberás integrar tu lógica de autenticación
  //chatService: ChatService

  constructor(private chatService:ChatService) { }

  ngOnInit(): void {
    this.loadMessages();
    setTimeout(() => this.scrollToBottom(), 0);
  }



  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }


  sendMessage(): void {

       // Obtener usuario del localStorage
       const currentUserString = localStorage.getItem('currentUser');
       
       if (!currentUserString) {
         alert('User not found. Please log in.');
         return;
       }
       
       const currentUser: any = JSON.parse(currentUserString);
       
       if (this.newMessage.trim()) {
         // Enviar mensaje al servidor y luego actualizar la vista
         this.chatService.createMessage(this.newMessage, currentUser.id).subscribe(() => {
           this.messages.push({ author: currentUser.username, message: this.newMessage, messageDate: new Date() });
           this.newMessage = '';
         });
       } else {
         alert('Please enter a non-empty message.');
       }
   }


  loadMessages(): void {
    // Aquí deberías agregar la lógica para cargar los mensajes desde el servidor o servicio de backend
    this.chatService.getAll().subscribe((response: any) => {
      this.messages = response;
      console.log(this.messages);
    });
  }


  formatMessageDate(dateString: string): string {
    const messageDate = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit'
    };

    if (messageDate.toDateString() === today.toDateString()) {
      return 'Hoy ' + messageDate.toLocaleTimeString([], timeOptions);
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Ayer ' + messageDate.toLocaleTimeString([], timeOptions);
    } else {
      return messageDate.toLocaleDateString();
    }
  }

}
