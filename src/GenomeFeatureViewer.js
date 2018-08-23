import DrawViewer from './DrawViewer';
import {ApolloService} from './services/services';
/*
 Main entry for creating the genome viewer.
 Currently only draws isoforms at a global level
 @Param config: a set of configurations for the isoform track
    {
        chromosome: 5,
        start: 75574916,
        end: 75656722,
        genome: "Mus musculus",
        highlightNames: ['Kit']
    }

  @Param svg_target: a DOM element id, where the viewer will be drawn.
*/
var GenerateGenomeView = function (config, svg_target) {
    // TODO:
    // Config should be a set of tracks and we should be drawing
    // based on track type to the svg
    let {chromosome, start, end, genome, server, track, highlightNames} = config;
    server = server ? server : 'https://agr-apollo.berkeleybop.io/apollo/';
    track = track ? track : 'All Genes';
    let nameString = '';

    for (let nameIndex in highlightNames) {
        nameString += nameIndex == 0 ? '?' : '&';
        nameString += 'name=' + highlightNames[nameIndex];
    }

    let externalLocationString = chromosome + ':' + start + '..' + end;
    let dataUrl = server + '/track/' + encodeURI(genome) + '/' + track + '/' + encodeURI(externalLocationString) + '.json' + nameString;

    // TODO: We can still make this more robust.
    var apolloService = new ApolloService();
    apolloService.GetIsoformTrack(dataUrl).then((data) => {
        DrawViewer(data, svg_target);
    });
};

export default GenerateGenomeView;