import { Component, Input, OnInit } from '@angular/core';
import { PostModel } from '../post-model';
import { faArrowUp, faArrowDown, faComments } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
	selector: 'app-post-tile',
	templateUrl: './post-tile.component.html',
	styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent implements OnInit {

	faComments = faComments;

	@Input() posts: Array<PostModel> = [];

	constructor(private router: Router) { }

	ngOnInit(): void {
	}

	goToPost(postId: number): void {
		this.router.navigateByUrl("/view-post/" + postId);
	}
}
