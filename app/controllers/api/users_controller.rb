require "open-uri"

class Api::UsersController < ApplicationController
  
  def create
    @user = User.create(strong_params)
    # cow profile: https://live.staticflickr.com/65535/52405649690_9f0a22c374_b.jpg
    # plants header: https://live.staticflickr.com/65535/51968874805_9ed9ef93bf_h.jpg
    unless @user.prof_pic.attached?
      @user.prof_pic.attach(io: URI.open("https://live.staticflickr.com/65535/52405649690_9f0a22c374_b.jpg"), filename: "default_prof.jpg")
    end
    unless @user.header.attached?
      @user.header.attach(io: URI.open("https://live.staticflickr.com/65535/51968874805_9ed9ef93bf_h.jpg"), filename: "default_header.jpg")
    end
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
        if params[:user][:header_url]
          @user.header.attach(io: URI.open(params[:user][:header_url]), filename: "header_image.jpg") 
        elsif params[:user][:prof_pic_url]
          @user.prof_pic.attach(io: URI.open(params[:user][:prof_pic_url]), filename: "profile_pic.jpg")
        end
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
    params.require(:user).permit(:id, :display_name, :email, :age, :first_name, :last_name, :password, :description, :website, :website_name, :occupation, :hometown, :current_city, :country, :airport, :facebook, :twitter, :instagram, :pinterest, :tumblr, :header, :header_url, :prof_pic, :prof_pic_url)
  end
end