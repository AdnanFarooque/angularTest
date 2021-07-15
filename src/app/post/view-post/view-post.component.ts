import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { CommentPayload } from 'src/app/comment/comment.payload';
import { CommentService } from 'src/app/comment/comment.service';
import { PostModel } from 'src/app/shared/post-model';
import { PostService } from 'src/app/shared/post.service';

@Component({
	selector: 'app-view-post',
	templateUrl: './view-post.component.html',
	styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

	postId!: number;
	post: PostModel;
	commentForm: FormGroup;
	commentPayload: CommentPayload;
	comments: CommentPayload[] = [];

	constructor(private postService: PostService, private activatedRoute: ActivatedRoute,
		private commentService: CommentService) {

		this.post = new PostModel();

		this.postId = this.activatedRoute.snapshot.params.postId;
		this.getPostById(this.postId);
		this.getCommentForPost();

		this.commentForm = new FormGroup({
			text: new FormControl("", Validators.required)
		});

		this.commentPayload = {
			text: "",
			postId: this.postId
		}
	}

	ngOnInit(): void {
		this.postId = this.activatedRoute.snapshot.params.postId;
		this.getPostById(this.postId);
		this.getCommentForPost();
	}

	postComment() {
		this.commentPayload.text = this.commentForm.get("text")?.value;
		this.commentService.postComment(this.commentPayload).subscribe((data: any) => {
			this.commentForm.get("text")!.setValue("");
			this.getCommentForPost();
		}, (error: any) => {
			throwError(error);
		});
	}

	private getCommentForPost() {
		this.commentService.getAllCommentsForPost(this.postId).subscribe((data: any) => {
			this.comments = data;
		}, error => {
			throwError(error);
		});
	}

	private getPostById(postId: number) {
		// var post = new PostModel();
		this.postService.getPost(postId).subscribe(data => {
			this.post = data;
		}, error => {
			throwError(error);
		})
	}
}
