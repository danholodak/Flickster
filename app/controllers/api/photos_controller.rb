class Api::PhotosController < ApplicationController

    def create
        @photo = Photo.create(strong_params)
        if @photo.save
            render :show
        else
            render json: {errors: @photo.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def show
        @photo = Photo.find_by(id: params[:id])
        if @photo
            render :show
        end
    end

    def index
        @photos = Photo.all
        render :index
    end

    def update
        @photo = Photo.find_by(id: params[:id])
        if @photo
            @photo.update(strong_params)
            if @photo.save
                render :show
            else
                render json: {errors: @photo.errors.full_messages}, status: :unprocessable_entity
            end
        end

    end

    def destroy
        @photo = Photo.find_by(id: params[:id])
        if @photo.destroy
            render json: "success"
        end

    end

    private

    def strong_params
        params.require(:photo).permit(:id, :title, :user_id)
    end

end