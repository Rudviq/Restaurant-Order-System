from channels.generic.websocket import WebsocketConsumer
import json

class OrderConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
    
    def receive(self, text_data):
        data = json.loads(text_data)
        self.send(text_data=json.dumps({"message": "Order updated"}))
