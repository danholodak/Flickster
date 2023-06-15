class Api::FavoritesController < ApplicationController
    def create
        @favorite = Favorite.new(strong_params)
        if @favorite.save
        render json: "success"
        else
        render json: @favorite.errors.full_messages, status: 422
        end
    end

    def destroy
        @favorite = Favorite.find_by(user_id: params[:favorite][:user_id], photo_id: params[:favorite][:photo_id])
        if @favorite.destroy
            render json: "success"
        end
    end

    def strong_params
        params.require(:favorite).permit(:user_id, :photo_id)
    end
end