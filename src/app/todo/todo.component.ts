import { Component } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  newTask: string = ''; // Pour stocker la nouvelle tâche saisie
  tasks: { label: string, completed: boolean }[] = []; // Liste des tâches

  // Ajouter une nouvelle tâche à la liste
  addTask() {
    if (this.newTask.trim() !== '') {
      this.tasks.push({ label: this.newTask, completed: false });
      this.newTask = ''; // Réinitialise le champ de saisie
    }
  }

  // Marquer une tâche comme terminée
  completeTask(task: { label: string, completed: boolean }) {
    task.completed = true;
  }

  // Supprimer une tâche
  removeTask(index: number) {
    this.tasks.splice(index, 1);
  }
}

