class Api::SessionsController < ApplicationController
  def show
    if self.current_user
      @user = @current_user
      render 'api/users/show'
    else
      render json: {user: nil}
    end
  end

  def create
    @user = User.find_by_credentials(params[:email], params[:password])
    if @user
      login!(@user)
      render 'api/users/show'
    else
      render json: { errors: ['Invalid email or password.'] }, status: :unauthorized
    end
  end

  def destroy
    # theoretically @current_user should work here - it gets set by the show() call
    # but it's nil here :shrug:
    if self.current_user
      logout!
    end
  end
end
