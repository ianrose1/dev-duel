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

  // whichever is first alphabetically wins
  comapreStringFields(field1: string, field2: string) {
    if (field1 <= field2) {
      return true
    }
    return false
  }

  // whichever number is higher wins
  compareNumberFields(field1: number, field2: number) {
    if (field1 >= field2) {
      return true
    }
    return false
  }

  // ties go to user1
  duelUsers(user1: User, user2: User) {
    user1.points = 0;
    user1.winner = false;
    user2.points = 0
    user2.winner = false;
    // username
    if (this.comapreStringFields(user1.username, user2.username)) {
      user1.points++
    }
    else {
      user2.points++
    }

    // name
    if (this.comapreStringFields(user1.name, user2.name)) {
      user1.points++
    }
    else {
      user2.points++
    }

    // location
    if (this.comapreStringFields(user1.location, user2.location)) {
      user1.points++
    }
    else {
      user2.points++
    }

    // titles
    if (user1.titles.length >= user2.titles.length) {
      user1.points++
    }
    else {
      user2.points++
    }

    // fav language
    if (this.comapreStringFields(user1['favorite-language'], user2['favorite-language'])) {
      user1.points++
    }
    else {
      user2.points++
    }

    // total stars
    if (this.compareNumberFields(user1['total-stars'], user2['total-stars'])) {
      user1.points++
    }
    else {
      user2.points++
    }

    // highest star count
    if (this.compareNumberFields(user1['highest-starred'], user2['highest-starred'])) {
      user1.points++
    }
    else {
      user2.points++
    }

    // public repos
    if (this.compareNumberFields(user1['public-repos'], user2['public-repos'])) {
      user1.points++
    }
    else {
      user2.points++
    }

    // perfect repos
    if (this.compareNumberFields(user1['perfect-repos'], user2['perfect-repos'])) {
      user1.points++
    }
    else {
      user2.points++
    }

    // followers
    if (this.compareNumberFields(user1.followers, user2.followers)) {
      user1.points++
    }
    else {
      user2.points++
    }

    // following
    if (this.compareNumberFields(user1.following, user2.following)) {
      user1.points++
    }
    else {
      user2.points++
    }

    // winner
    if (user1.points >= user2.points) {
      user1.winner = true
    }
    else {
      user2.winner = true
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
          this.duelUsers(this.user1, this.user2)
          console.log(this.user1)
          console.log(this.user2)
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
