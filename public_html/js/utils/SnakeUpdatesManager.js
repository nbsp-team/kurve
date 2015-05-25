define([
    'app',
    'utils/api/ws/api_ws'
], function(
    app,
    Api
){

    SnakeUpdatesManager = Backbone.Model.extend( {
		lastId: 0,
		updatesQueue: [],
        initialize: function() {
			this.listenTo(app.wsEvents, "wsOnUpdateEvent", this.snakeUpdate);
			this.listenTo(app.wsEvents, "wsOnPatchEvent", this.onPatch);
		},
		snakeUpdate: function(update){
			var id = update.id;
			if (id <= this.lastId) return;
			if(id === this.lastId+1) {
			    app.wsEvents.trigger("wsSnakeUpdateEvent", update.snake);
			    this.lastId++;
			} else {
				if(game_log) console.log('updates manager last id < id');
			    this.insertIntoQueue(update);

			}
			this.sendQueued();
		},
		onPatch: function(updates){
		    for(var i = 0; i < updates.length; i++){
		        this.insertIntoQueue(updates[i]);
		    }
		    this.sendQueued();
		},
		insertIntoQueue: function(update){
		    if(this.updatesQueue.length == 0) {
		        this.updatesQueue.push(update);
		        return;
		    }
		    for(var i = 0; i < this.updatesQueue.length; i++){
		        if(this.updatesQueue[i].id === update.id) return;
		        if(this.updatesQueue[i].id > update.id ) {
		            this.updatesQueue.splice(i, 0, update);
		            
		            return;
		        }
		    }
		    this.updatesQueue.push(update);
		},
		sendQueued: function(){
		    while( 0 < this.updatesQueue.length && this.updatesQueue[0].id === this.lastId+1){
				if(game_log) console.log('update queue[0] ok to apply');
		        app.wsEvents.trigger("wsSnakeUpdateEvent", this.updatesQueue[0].snake);
		        this.lastId++;
		        this.updatesQueue.splice(0, 1);
		    }

		    if(this.updatesQueue.length === 0) return;
		    if(this.updatesQueue[0].id <= this.lastId && game_log) console.log('***id < lastId*************');
		    var lost = [];
		    for(var i = this.lastId+1; i < this.updatesQueue[0].id; i++) lost.push(i);
		    for(var i = 1; i < this.updatesQueue.length; i++){
		        for(var j = this.updatesQueue[i-1].id+1; j < this.updatesQueue[i].id; j++) lost.push(j);
		    }
		    //console.log(JSON.stringify(this.updatesQueue));
		    Api.sendRequestPatch(lost);
		}
    });

    return SnakeUpdatesManager;
});
