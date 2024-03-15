import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/user.service';
import User from '../model/User'
import Error from '../model/Error'

@Component({
  selector: 'app-duel',
  templateUrl: './duel.component.html',
  styleUrls: ['./duel.component.css']
})
export class DuelComponent implements OnInit {
  usernameOne: string = ""
  usernameTwo: string = ""
  user1: User | undefined = undefined
  user2: User | undefined = undefined
  error: Error | null = null
  loading = false

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  receiveUsernameOne(valueEmitted: string) {
    this.usernameOne = valueEmitted;
  }

  receiveUsernameTwo(valueEmitted: string) {
    this.usernameTwo = valueEmitted;
  }

  // ties go to user1
  duelUsers(user1: User, user2: User) {
    if (user1.username <= user2.username) {
      user1.winner = true;
    }
    else {
      user2.winner = true;
    }
    if (user1.name <= user2.name) {
      user1.winner = true;
    }
  }

  onSubmit() {
    this.user1 = undefined
    this.user2 = undefined
    this.error = null
    this.loading = true
    this.userService.duelUsers(this.usernameOne, this.usernameTwo)
      .then((response) => {
        if (response && response.length > 0) {
          this.user1 = response[0]
          this.user2 = response[1]
        }
      })
      .catch((error) => {
        this.error = error
      })
      .finally(() => {
        this.loading = false
      })
  }
}
