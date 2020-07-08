class MessagesController < ApplicationController
  before_action :set_group
  
  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end

  def create
    @message = Message.new(message_params)
  end

  private

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)

  def set_group
    @group = Group.find(params[:group_id])
  end
end
