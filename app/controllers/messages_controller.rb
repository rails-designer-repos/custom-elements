class MessagesController < ApplicationController
  def index
    @messages = Message.all
  end

  def create
    @message = Message.new(message_params)

    respond_to do |format|
      if @message.save
        format.turbo_stream
      else
        format.html { redirect_to messages_path, alert: "Failed to save message" }
      end
    end
  end
end
