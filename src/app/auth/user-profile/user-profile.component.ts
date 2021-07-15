import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { CommentPayload } from 'src/app/comment/comment.payload';
import { CommentService } from 'src/app/comment/comment.service';
import { PostModel } from 'src/app/shared/post-model';
import { PostService } from 'src/app/shared/post.service';

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {

	username: string = "";
	posts!: PostModel[];
	comments!: CommentPayload[];
	postLength: number = 0;
	commentLength: number = 0;

	constructor(private activatedRoute: ActivatedRoute, private postService: PostService
		, private commentService: CommentService) {
		this.username = this.activatedRoute.snapshot.params.name;

		this.postService.getAllPostsByUser(this.username).subscribe(data => {
			this.posts = data;
			this.postLength = data.length;
		});

		this.commentService.getAllCommentsByUser(this.username).subscribe(data => {
			this.comments = data;
			this.commentLength = data.length;
		})
	}

	ngOnInit(): void {

	}

}
