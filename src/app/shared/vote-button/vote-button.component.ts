import { Component, Input, OnInit } from '@angular/core';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { PostModel } from '../post-model';
import { VotePayload } from './vote-payload';
import { VoteService } from '../vote.service';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { PostService } from '../post.service';
import { VoteType } from './vote-type';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';

@Component({
	selector: 'app-vote-button',
	templateUrl: './vote-button.component.html',
	styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {

	@Input() post: PostModel;
	votePayload: VotePayload;
	faArrowUp = faArrowUp;
	faArrowDown = faArrowDown;
	upvoteColor: string = "";
	downvoteColor: string = "";
	isLoggedIn: boolean = false;

	// constructor(private postService: PostService) { }
	constructor(private voteService: VoteService,
		private authService: AuthService,
		private postService: PostService, private toastr: ToastrService) {
		this.post = new PostModel();

		this.votePayload = {
			voteType: VoteType.NULL,
			postId: 0
		}

		this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
	}

	ngOnInit(): void {
		this.updateVoteDetails();
	}

	upvotePost() {
		this.votePayload.voteType = VoteType.UPVOTE;
		this.vote();
		this.downvoteColor = 'red';
		this.upvoteColor = "";
	}

	downvotePost() {
		this.votePayload.voteType = VoteType.DOWNVOTE;
		this.vote();
		this.upvoteColor = 'green';
		this.downvoteColor = "";
	}

	private vote() {
		this.votePayload.postId = this.post.postId;
		this.voteService.vote(this.votePayload).subscribe((data) => {
			this.updateVoteDetails();
		}, error => {
			this.toastr.error(error.error.message);
			throwError(error);
		});
	}

	private updateVoteDetails() {
		this.postService.getPost(this.post?.postId).subscribe(post => {
			this.post = post;
		});
	}

}
