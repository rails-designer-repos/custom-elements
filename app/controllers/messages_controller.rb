class MessagesController < ApplicationController
  def index
    @messages = Message.all
  end

  def create
    @message = Message.new(message_params)

    respond_to do |format|
      if @message.save
        sleep 1
        format.turbo_stream
      else
        format.html { redirect_to messages_path, alert: "Failed to save message" }
      end
    end
  end

  private

  def message_params
    params.expect(message: [:content])
  end
end
