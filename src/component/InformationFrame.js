import React, { Component } from 'react';
import './InformationFrame.css';
import SearchIcon from 'react-icons/lib/fa/search';
import MusicPlayer from './MusicPlayer';
import { HashLoader, ScaleLoader} from 'react-spinners';
import DownIcon from 'react-icons/lib/fa/angle-double-down';
import axios from 'axios';
import { host } from '../config';

class InformationFrame extends Component {
    constructor(props){
        super(props);
        this.state = {
            keyword: "",
            suggestClass: "unvisible",
            suggestList: [],
            currentSong: "",
            searching: false,
            loading: false,
            recommendedList: [],
        }
        this.valueOfSearch = this.valueOfSearch.bind(this);
        this.search = this.search.bind(this);
        this.selectSong = this.selectSong.bind(this);
    }       

    valueOfSearch(e){
        this.setState({keyword:e.target.value})
    }

    search(e){
        if(e.keyCode==13){
            let keyword = this.state.keyword;
            // dispatch api here to get data
            // returning data will be assigned to this.suggestList
            // change value of this.state.suggestClass to visible
            this.setState({searching:true});
            setTimeout(() => {
                let link = 'http://'+host+"/api/song/search?name="+this.state.keyword;
                axios.get(link)
                .then(success => success.data)
                .then(data => {
                    let suggestList = data.result || [];
                    this.setState({
                        searching:false,
                        suggestList,
                        suggestClass: "visible",
                    });
                })
                .catch(err => console.log(err));
            }, 1000);
            
        }
    }

    selectSong(e){
        this.setState({
            currentSong:e.song_name + "-" + e.artist_name,
            suggestClass: "unvisible",
        });
        this.setState({
            loading: true,
        })
        
        // load recommand list
        // let linkRecommand = 'http://'+host+'/api/song/recommend';
        // axios.get(linkRecommand)
        // .then(success => success.data)
        // .then(data => {
        //     this.setState({
        //         loading: false,
        //         recommendedList: data,
        //     })
        // })
        // .catch(e => console.log(e))

        // Dispatching a api to saying with server that i chose a song
        let linkListeningSong = 'http://'+host+'/api/song/listen';
        axios.post(linkListeningSong, {song_id:e.song_id})
        .then(success => success.data)
        .then(data => console.log(data))
        .then(() => {
            let linkRecommand = 'http://'+host+'/api/song/recommend';
            return axios.get(linkRecommand)
        })
        .then(success => success.data)
        .then(data => {
            this.setState({
                loading: false,
                recommendedList: data,
            })
        })
        .catch(e => console.log(e));
    }

    render(){
        return(
            <div className="frame-if">
                <div className="search-wrapper">
                    {
                        this.state.searching === false ? <SearchIcon id="search-icon"/> : <div id="search-icon"><HashLoader size={15} color="#70103A"/></div>
                    }
                    <input type="text" id="search-frame" placeholder="Search..." onChange={this.valueOfSearch} onKeyDown={this.search}/>
                    <div className={"suggess "+this.state.suggestClass}>
                        <ol>
                            {this.state.suggestList.map(e => <li onClick={()=> this.selectSong(e)}>{e.song_name + "-" + e.artist_name}</li>)}
                        </ol>    
                        <DownIcon id="downicon" onClick={()=> this.setState({suggestClass:"unvisible"})}/> 
                    </div>
                    <div className="wrapper">
                        <div className="partition">
                            <MusicPlayer currentSong={this.state.currentSong}/>
                        </div>
                        <div className="partition">
                            <div className="recommand">
                                <ol>
                                    {this.state.recommendedList.map( e => <li onClick={()=> this.selectSong(e)}>{e.song_name + "-" + e.artist_name}</li>)}
                                </ol>
                            </div>
                            <div id="pacman-loader">
                                <ScaleLoader color="#00E2BB" loading={this.state.loading}/>
                            </div>    
                        </div>
                    </div>
                </div>   
            </div>
        )
    }
}

export default InformationFrame;