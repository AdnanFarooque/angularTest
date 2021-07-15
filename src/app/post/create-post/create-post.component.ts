import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { PostService } from 'src/app/shared/post.service';
import { SubredditModel } from 'src/app/subreddit/subreddit-response';
import { SubredditService } from 'src/app/subreddit/subreddit.service';
import { CreatePostPayload } from './create-post.payload';

@Component({
	selector: 'app-create-post',
	templateUrl: './create-post.component.html',
	styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

	createPostForm!: FormGroup;
	postPayLoad: CreatePostPayload;
	subreddits!: Array<SubredditModel>;

	constructor(private router: Router, private postservice: PostService,
		private subredditService: SubredditService) {
		this.postPayLoad = {
			postName: "",
			url: "",
			description: "",
			subredditName: ""
		}
	}

	ngOnInit(): void {
		this.createPostForm = new FormGroup({
			postName: new FormControl("", Validators.required),
			subredditName: new FormControl("", Validators.required),
			url: new FormControl("", Validators.required),
			description: new FormControl("", Validators.required),
		});
		this.subredditService.getAllSubreddits().subscribe((data) => {
			this.subreddits = data;
		}, error => {
			throwError(error);
		});
	}

	createPost() {
		this.postPayLoad.postName = this.createPostForm.get("postName")?.value;
		this.postPayLoad.subredditName = this.createPostForm.get("subredditName")?.value;
		this.postPayLoad.url = this.createPostForm.get("url")?.value;
		this.postPayLoad.description = this.createPostForm.get("description")?.value;

		this.postservice.createPost(this.postPayLoad).subscribe((data) => {
			this.router.navigateByUrl("/");
		}, error => {
			throwError(error);
		})
	}

	discardPost() {
		this.router.navigateByUrl("/");
	}

}
