import { Component, Input, OnInit } from '@angular/core'
import { from } from 'rxjs'
import { UserService } from 'src/user.service'
import User from '../model/User'
import Error from '../model/Error'

@Component({
  selector: 'app-inspect',
  templateUrl: './inspect.component.html',
  styleUrls: ['./inspect.component.css']
})
export class InspectComponent implements OnInit {
  user: User | undefined = undefined
  error: Error | null = null
  username = ""
  loading = false

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  receiveUsername(valueEmitted: string) {
    this.username = valueEmitted;
  }

  onSubmit() {
    this.user = undefined
    this.error = null
    this.loading = true
    this.userService.inspectUser(this.username)
      .then((response) => {
        this.user = response
      })
      .catch((error) => {
        this.error = error
      })
      .finally(() => {
        this.loading = false
      })
  }

}
