/**
 * Author: Joshua Carter
 * Created: 25/01/2018
 * Edited: 22/02/2018
 */
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Http } from "@angular/http";

//alert types
enum AlertType {
	INFO,
	ERROR,
}

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	//backend servers for student data
	readonly servers = [
		{ name: "PHP", url: "http://localhost:80/files.php/?file=" },
		{ name: "Node.js", url: "http://localhost:81/files/" },
		{ name: "Go", url: "http://localhost:82/files/" },
	];
	//active backend server, php by default
	active_server = this.servers[0];

	//user data containers
	users = [];
	quest_paths = [];
	selected_paths = [];

	//dropdown labels
	users_drop_label: string = "Select student";
	servers_drop_label: string = "PHP";

	//alert lists
	errors: string[] = [];
	infos: string[] = [];

	constructor(private http: Http) { }

	ngOnInit() {
		this.getFiles();
	}

	/**
	 * Performs get requests to backend server
	 */
	getFiles() {
		//get student json files from server
		this.getRemoteFile("users.json", this.users);
		this.getRemoteFile("quest_pathways.json", this.quest_paths);

		//DEMO alerts
		this.alert(AlertType.INFO,
			"The demo errors below show a local and remote error.");
		this.getRemoteFile("no_file_demo.json", null);
		this.getRemoteFile("bad_json_demo.json", null);
	}

	/**
	 * Gets student file from server and caches results
	 * @param file the file to request
	 * @param cache array to store json objects
	 */
	getRemoteFile(file: string, cache: any[]): void {
		//send request
		this.http.get(this.active_server.url + file)
			.subscribe((response) => {
				//try to parse and cache result
				try {
					//get json data as array
					let arr = JSON.parse(response.text());

					//find error (if any)
					let err = arr.find(x => x.hasOwnProperty('error'));

					//if found error
					if (err !== undefined) {
						//display error message
						this.alert(AlertType.ERROR, err.error);
					}
					//else no error
					else {
						//copy to cache
						Object.assign(cache, arr);
					}
				}
				//catch and display error
				catch (e) {
					this.alert(AlertType.ERROR,
						"Unable to parse <strong>" + file + "</strong> (" + e.message + ")");
				}
			});
	}

	/**
	 * Invoked when client selects a user from menu
	 * @param user selected user
	 */
	onUserChange(user: any): void {
		//find quest path with matching user id
		let path = Object.assign({}, this.quest_paths.find(x => x.user_id === user.id));

		//if no matching path
		if (path === undefined) {
			//display err
			this.alert(AlertType.ERROR, "No matching path for user could be found.");
			return;
		}

		//add name for template binding
		path['name'] = user.fullname;
		//reset selected paths
		this.selected_paths = [];
		//add new path
		this.selected_paths.push(path);
		//change dropdown text to reflect selection
		this.users_drop_label = user.fullname;

	}

	/**
	 * Handles selection of 'all' users
	 */
	onUserAll() {
		//override selected paths with a deep copy of quest paths
		this.selected_paths = JSON.parse(JSON.stringify(this.quest_paths));

		//for each selected path, add name from matching user
		this.selected_paths.map((x) => {
			x['name'] = this.users.find(u => u.id === x.user_id).fullname;
		}, this);

		//change dropdown text to reflect selection
		this.users_drop_label = "All Quests";
	}

	/**
	 * Changes the active backend server
	 * @param server server object passed from template
	 */
	onServerChange(server) {
		//change active server
		this.active_server = server;
		//change server dropdown label
		this.servers_drop_label = this.active_server.name;

		//remove all data from previous server
		this.users = [];
		this.quest_paths = [];
		this.selected_paths = [];
		this.errors = [];
		this.infos = [];
		this.users_drop_label = "Select student";

		//get data from current server
		this.getFiles();
	}

	/**
	 * Gets a string for displaying a quest's mark status to the client
	 * @param submitted whether quest has been submitted
	 * @param mark quest's mark [null or number]
	 * @return string to display
	 */
	getMarkStatus(submitted: boolean, mark: any): string {
		//if no submission, then need to submit
		if (!submitted) {
			return "Submission Required";
		}
		//or if have submission but no mark, then awaiting mark 
		else if (mark == null) {
			return "Not Yet Marked";
		}
		//else must have a submission and a mark, show mark
		else {
			return mark + "%";
		}
	}

	/**
	 * Displays error to client
	 * @param msg message to dispaly
	 */
	alert(type: AlertType, msg: string): void {
		//add to to appropriate list to be shown in template
		switch (type) {
			case AlertType.INFO: this.infos.push(msg); break;
			case AlertType.ERROR: this.errors.push(msg); break;
		}
	}
}
