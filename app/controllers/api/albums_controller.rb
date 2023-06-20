class Api::AlbumsController < ApplicationController

    def create
        @album = Album.new(strong_params)
        if @album.save
        render json: "success"
        else
        render json: @album.errors.full_messages, status: 422
        end
    end

    def show
        @album = Album.find_by(id: params[:id])
        if @album
            render :show
        end
    end

    def index
        @albums = Album.where(user_id: params[:user_id])
        if @albums
            render :index
        end
    end

    def update
        @album = Album.find_by(id: params[:id])
        if @album
            @album.update(strong_params)
            if @album.save
                render :show
            else
                render json: {errors: @album.errors.full_messages}, status: :unprocessable_entity
            end
        end

    end

    def destroy
        @album = Album.find_by(id: params[:id])
        if @album.destroy
            render json: "success"
        end

    end

    private

    def strong_params
        params.require(:album).permit(:id, :user_id, :header_id, :description, :title)
    end

end