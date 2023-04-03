class Api::UsersController < ApplicationController
  def create
    @user = User.create(user_params)
    if @user.save
      login!(@user)
      render :show
    else
      render json: {errors: @user.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def show
    @user = User.find_by(id: params[:id])
    if @user
      render :show
    end
  end

  def update
  end

  def destroy
  end

  def index
  end

  private 

  def strong_params
    params.require(:user).permit(:email, :username, :password)
  end
end
