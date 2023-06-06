class Api::UsersController < ApplicationController
  def create
    @user = User.create(strong_params)
    
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
    @user = User.find_by(id: params[:id])
    if @user
      if params[:password]
        if @user.authenticate(params[:password])
          @user.password=params[:new_password]
          if @user.save
            render :show
          else
            render json: {errors: @user.errors.full_messages}, status: :unprocessable_entity
          end
        end
      else
        @user.update(strong_params)
        if @user.save
          render :show
        else
          render json: {errors: @user.errors.full_messages}, status: :unprocessable_entity
        end
      end
    end
  end

  def destroy
    @user = User.find_by(id: params[:id])
    if @user.destroy
      render json: "success"
    end
  end

  def index
    @users = User.all

    render :index
  end

  private 

  def strong_params
    params.require(:user).permit(:id, :display_name, :email, :age, :first_name, :last_name, :password, :description, :website, :website_name, :occupation, :hometown, :current_city, :country, :airport, :facebook, :twitter, :instagram, :pinterest, :tumblr, :header, :prof_pic)
  end
end